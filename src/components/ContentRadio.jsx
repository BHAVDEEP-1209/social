import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ContentRadio(props) {
    const handleChange=(e)=>{
        props.state.setFormValues((prev)=>{
            return {
                ...prev,
                type : e.target.value
            }
        })
    }
  return (
    <FormControl className='contentRadio'>
      <FormLabel id="demo-row-radio-buttons-group-label">Content Type:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.state.formValues.type}
        onChange={handleChange}
        className='radioHeading'
      >
        <FormControlLabel value="image" control={<Radio />} label="Image" />
        <FormControlLabel value="video" control={<Radio />} label="Video" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}