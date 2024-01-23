import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


test('form validation', async () => {
  const { getByText, getByLabelText } = render(<App />);


  fireEvent.click(getByText('Add Data'));

  expect(getByText('All fields are required.')).toBeInTheDocument();


  fireEvent.change(getByLabelText('firstName'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('lastName'), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText('email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('phoneNumber'), { target: { value: '1234567890' } });


  fireEvent.click(getByText('Add Data'));


  expect(getByText('All fields are required.')).not.toBeInTheDocument();
});

