import React from 'react';
import Typed from 'typed.js';



export default  function Typing({text}) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: text,
      typeSpeed: 150,
      backSpeed: 100,
       loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div >
      {console.log("cc")}
      <span ref={el} />
    </div>
  );
}