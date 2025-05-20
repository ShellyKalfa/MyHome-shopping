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


// app.post('/creatFamliy/:id', (req, res) => {
//   const userId = req.params.id;
//    const { nameFamliy} = req.body;
//   //  INSERT INTO `family` (`familyId`, `familyName`) VALUES (NULL, 'cccc') 
//  const insertFamliySql = "INSERT INTO family (familyId, familyName) VALUES (NULL, ?)";
//  const insertFamliyvalues = [nameFamliy];

//   db.query(insertFamliySql, insertFamliyvalues, (err, data) => {
//     if (err) {
//       console.error("Login Failed:", err);
//       return res.status(500).json("Login Failed");
//     }
//     //INSERT INTO `memberFamily` (`userId`, `familyId`, `role`) VALUES ('9', '1', 'manger'); 
//      const insertmemberFamliySql = "INSERT INTO family (familyId, familyName) VALUES (NULL, ?)";
 

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