//     useEffect(() => {
//     let timeoutId;

//     if (!isUser) {
//         console.log("sss")
//       timeoutId = setTimeout(() => {
//          navigate('/');// redirect to main page
//       }, 10000); // 10 seconds timeout
//     }else{

//     // Clear the timeout if `isUser` changes to `true` or if component unmounts
//     clearTimeout(timeoutId);}
//   }, [isUser])


// app.post('/creatFamily/:id', (req, res) => {
//   const userId = req.params.id;
//    const { nameFamily} = req.body;
//   //  INSERT INTO `family` (`familyId`, `familyName`) VALUES (NULL, 'cccc') 
//  const insertFamilySql = "INSERT INTO family (familyId, familyName) VALUES (NULL, ?)";
//  const insertFamilyvalues = [nameFamily];

//   db.query(insertFamilySql, insertFamilyvalues, (err, data) => {
//     if (err) {
//       console.error("Login Failed:", err);
//       return res.status(500).json("Login Failed");
//     }
//     //INSERT INTO `memberFamily` (`userId`, `familyId`, `role`) VALUES ('9', '1', 'manger'); 
//      const insertmemberFamilySql = "INSERT INTO family (familyId, familyName) VALUES (NULL, ?)";
 

//  // const values = [userId];
//     if (data.length >= 0) {
//         console.log(`✅ Login successful for member ID: ${userId}`, data[0]);
//         if(data.length > 0)
//          {
//               return res.json({ success: true, familyName: data });
//          }
//          else {
//                return res.json({ success: true, familyName: null });
//          }
//     } else {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
//   });
// });


///////////////////////////////////////////
    // const [item,setItem]=useState("")
    //  const  handleSignUp = (event) => {
    //     event.preventDefault();
    //  axios.post('http://localhost:5000/search', {"aggs": 1,"q": "גבינה",  "store": 331})
    //       .then(res => { 
            
    //         console.log(res.data);
    //         setItem(res.data.data[0].name);

    //       })
    //       .catch(err => {console.log(err.response.data)})

     
    // }

    ////////////////////////?

    // const handleGetUser = () => {
    //     if (dataUser.email != '' && dataUser.password != '') {
    //         axios.post('http://localhost:5000/login',
    //             {
    //                 email: dataUser.email,
    //                 password: dataUser.password
    //             })
    //             .then(res => {
    //                 console.log(res.data)
    //                 if (res.data.success) {
    //                     console.log(res.data.user)
                       
    //                 }
    //                 else {
    //                     setIsVisible(true);
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }
    /////////////////////////////////


//  if (!isUser) {
//         setTimeout(() => navigate('/'), 10000);
//         return <p>No user found. Redirecting to the main page in 10 seconds...</p>;
//     }

/////////////////////////////////////////////////////

    //   <select className="selectInput">
    //                 <option value="" disabled selected hidden>Choose category...</option>
    //                 <option>Dairy</option>
    //                 <option>bakery</option>
    //                 <option>meat</option>
    //                 <option>vegetables</option>
    //             </select>
