import React from 'react';
import { CustomButton } from './styles'

const Button = ({
  type,
  text,
  onClick,
  loading,
  
}) => {
  return ( 
    <CustomButton
      type={type}
      text={text}
      onClick={onClick}
      disabled={loading}

      >
        {text}
    </CustomButton>
   );
}
 
export default Button;