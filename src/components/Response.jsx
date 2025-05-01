import React from 'react';

function Response({ response }) {
  if (response) {
    return (
      <div>
        {response}
      </div>
    );
  } else {
    return null;
  }
}

export default Response;