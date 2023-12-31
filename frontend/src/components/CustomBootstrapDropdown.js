import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export const CustomBootstrapDropdown = ({locations, setLocation, location}) => {
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className='btn btn-light'
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </button>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Location: {location}
      </Dropdown.Toggle>
  
      <Dropdown.Menu as={CustomMenu}>
        {locations.map(loc=>
            <Dropdown.Item key={loc} onClick={()=>setLocation(loc)} active={loc===location}>{loc}</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
