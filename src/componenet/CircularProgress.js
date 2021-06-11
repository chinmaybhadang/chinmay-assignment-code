import React from 'react';
import { BounceLoader} from 'react-spinners';


const ShowCircularProgress = () => (
  <div style={{marginTop:'26px', width: '100%',}}>
            <BounceLoader
            marginTop={80}
          color={'#860aa5'} 
          size={200}
          loading={true} 
        />
  </div>
);

export default ShowCircularProgress;

//This componenet is created to show loader till data completely not fetched.