import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [step2Visible, setStep2Visible] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = () => navigate('/posts');

  // eslint-disable-next-line no-shadow
  const validateEmail = email =>
    email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  // eslint-disable-next-line no-shadow
  const validatePass = pass => {
    let formIsValid = true;
    let upperCount = 0;
    let lowerCount = 0;
    let specialCount = 0;
    for (let i = 0; i < pass.length; i++) {
      if (pass[i] === pass[i].toUpperCase()) {
        upperCount += 1;
      }

      if (pass[i] === pass[i].toLowerCase()) {
        lowerCount += 1;
      }
    }

    // eslint-disable-next-line no-useless-escape
    if (pass.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g)) {
      specialCount += 1;
    }

    if (upperCount > 1 && lowerCount > 1 && specialCount >= 1) {
      formIsValid = true;
    } else {
      formIsValid = false;
    }

    return formIsValid;
  };

  const postData = () => {
    // eslint-disable-next-line no-shadow
    const postData = {
      'emailId': email,
      'password': pass,
      'firstName': firstname,
      'lastName': lastname,
      'address': address,
      'countryCode': '+91',
      'phoneNumber': '2225550909',
    };

    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: postData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <main>
      <div className="bg-light p-5 mb-5">
        <div>
          <input
            type="email"
            placeholder="email"
            required
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={event => setPass(event.target.value)}
          />{' '}
          <br />
          {step2Visible && (
            <div>
              <input
                type="text"
                placeholder="firstname"
                required
                onChange={event => setFirstname(event.target.value)}
              />
              <input
                type="text"
                placeholder="lastname"
                onChange={event => setLastname(event.target.value)}
              />
              <input
                type="text"
                placeholder="address"
                required
                onChange={event => setAddress(event.target.value)}
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              validateEmail(email) && validatePass(pass) && setStep2Visible(true);
              // eslint-disable-next-line no-unused-expressions
              step2Visible && postData;
            }}
          >
            {' '}
            {step2Visible ? 'save & next' : 'next'}{' '}
          </button>
        </div>
      </div>
      <Container>
        <Form>
          <Button onClick={onSubmit}>Goto Posts</Button>
        </Form>
      </Container>
    </main>
  );
};

export default Home;
