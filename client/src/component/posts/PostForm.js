import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
const PHOTOGRAPH = 'PHOTOGRAPH';
const MODELLING = 'MODELLING';
const MUSIC = 'MUSIC';
const DESIGN = 'DESIGN';

const PostForm = ({ addPost }) => {
  //const [text, setText] = useState('');
  const [formData, setFormData] = useState({
        text: '',
        description: '',
        location:'',
        serviceType: '',


  });
  const {text, description,location,serviceType} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Post your service:</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({text, description, location, serviceType});
          setFormData('');
        }}
      >
         <textarea
          name='description'
          cols='30'
          rows='1'
          placeholder='description'
          value={description}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Details of your service'
          value={text}
          onChange={e => onChange(e)}
          required
        />
         <div className='form-group'>
             <input
              type='text'
              placeholder='location'
              name='location'
              value={location}
              onChange={e => onChange(e)}
              />
        </div>
         <select type='serviceType' name='serviceType' value={serviceType} onChange={e => onChange(e)} className='form-group' required>
           <option value="none" selected hidden>
                Select an service type
           </option>
           <option value={MUSIC}>MUSIC</option>
           <option value={PHOTOGRAPH}>PHOTOGRAPH</option>
           <option value={MODELLING}>MODEL</option>
           <option value={DESIGN}>DESIGN</option>
                </select>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
