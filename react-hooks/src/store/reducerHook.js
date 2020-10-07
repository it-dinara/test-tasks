import {useEffect} from 'react';

useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://cardholders-9f570.firebaseio.com//.json',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);