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

//////////////////////////liron

//    useEffect(() => {
//     if (!itemTyping || selectedFromSuggestions) {
//         setSuggestions([]);
//         setSelectedFromSuggestions(false);
//         return;
//     }

//     const timeoutId = setTimeout(() => {
//         axios.post(`${API_BASE}/search`, {
//             aggs: 1,
//             q: itemTyping,
//             store: 331
//         })
//         .then(res => {
//             if (res.data && res.data.data) {
//                 const results = res.data.data.map(product => product.name);
//                 setSuggestions(results.slice(0, 10)); 
//             }
//         })
//         .catch(err => console.error("Autocomplete from API error", err));
//     }, 300);

//     return () => clearTimeout(timeoutId);
// }, [itemTyping]);


// //update
// router.patch('/update/:itemId', (req, res) => {
//   const { itemId } = req.params;
//   const { itemName = null, quantity = null, price = null } = req.body;

//   const values = [];
//   const updates = [];

//   // Validate quantity
//   if (quantity !== null && (!Number.isInteger(quantity) || quantity < 0)) {
//     return res.status(400).json({ error: 'Invalid quantity (must be a non-negative integer)' });
//   }

//   // Dynamically build the query parts
//   if (itemName !== null) {
//     updates.push('itemName = ?');
//     values.push(itemName);
//   }
//   if (quantity !== null) {
//     updates.push('quantity = ?');
//     values.push(quantity);
//   }
//   if (price !== null) {
//     updates.push('price = ?');
//     values.push(price);
//   }

//   // If nothing to update
//   if (updates.length === 0) {
//     return res.status(400).json({ error: 'No fields to update' });
//   }

//   const sql = `UPDATE item SET ${updates.join(', ')} WHERE itemId = ?`;
//   values.push(itemId); // For WHERE clause

//   // Log the final query and values
//   console.log('SQL:', sql);
//   console.log('Values:', values);

//   // Run the query
//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//      console.log('result.affectedRows', result.affectedRows);

//     res.json({ message: 'Item updated', affectedRows: result.affectedRows });
//   });
// });


//   // db.query('UPDATE item SET quantity = ? WHERE itemId = ?', [quantity, itemId], (err, result) => {
//   //   if (err) return res.status(500).json({ error: err });
//   //   if (result.affectedRows === 0) return res.status(404).json({ error: 'Fruit not found' });
//   //   res.json({ message: 'Quantity updated' });
//   // });


// NEW toggleCompleted function - edited by idoaz1 in 10/6/2025
    // const toggleCompleted = async () => {
    //     try {
    //         const response = await axios.patch(`${API_BASE}/item/${item.itemId}`, {
    //             completed: !item.completed
    //         });
    //         if (updateItem) updateItem(item.itemId, { completed: !item.completed });
    //     } catch (err) {
    //         console.error('Failed to update item status:', err);
    //     }
    // };
// FINISH toggleCompleted function - edited by idoaz1 in 10/6/2025
