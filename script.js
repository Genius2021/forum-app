const { db } = require("./db.js");
const { v4: uuidv4 } = require("uuid");


// const communities = [ {name:"Politics", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Science and Tech", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Sports", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Entertainment", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Education", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Business", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Programming", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Love", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Food and Agriculture", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Earth Sustainability", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Gaming", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}, 
//     {name: "Culture and Tradition", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"},
//     {name: "Religion", creator_id:"8fa54d98-41af-476f-b7a1-84ef68751ee8"}]


//community table

// async function CommunityCreation(){
//      await db.connect();
//     communities.forEach( async (community) =>{
//         const {name, creator_id } = community;
//         await db.query("INSERT INTO community (community_name, creator_id) VALUES($1, $2);", [name, creator_id] )
//         console.log("community Insertions were successful!")
//     })
// }

// CommunityCreation();


//Users table
// const users = [
//     {firstname: "mane", lastname: "mane", username: "mane", email:"mane@gmail.com", password:"$2b$10$krgloMRxyxGEMCfje/GmBelEOMWzQcmbzN1NWeQwYbnlNyJwxYVle"},
//     {firstname: "messi", lastname: "messi", username: "messi", email:"messi@gmail.com", password:"$2b$10$PPBMAJhBTdrVxgR2E3Y2tu2x1aoGj8bVmvuIk8RkRDpF0kSgIUM62"},
//     {firstname: "dike", lastname: "dike", username: "dike", email:"dike@gmail.com", password:"$2b$10$O/XMopp4LvBoaz7z1dG/LuZUdaai6kDWRyZcrWphtf97Oroy6BRpi"},
//     {firstname: "david", lastname: "david", username: "david", email:"david@gmail.com", password:"$2b$10$14Aly0mjtmXO.bq4rGwu1.N.qlQgbvVghXJ/FA4M8/bZpBJCVR4b2"},
    
// ]

// async function UsersCreation(){
//     try{
//         await db.connect();
//         users.forEach( async (user) =>{
//             const { firstname, lastname, username, email, password, } = user;
//             await db.query("INSERT INTO users (firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5);", [firstname, lastname, username, email, password ])
//             console.log("Insertions were successful!")
//        })
//     }catch(error){
//         console.log(error.message)
//     }
// }

// UsersCreation();


// posts table

const posts = [
    {title: "TEN YEARS OF LOCAL CONTENT IMPLEMENTATION IN NIGERIA: SUCCESSES1",
    description: 'Gains accruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "messi",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "The classic story of two animals2.",
    description: "There are  repetition, injected humour, or non-characteristic worigerhe printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever sinds etc.",
    author: "messi",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "This is some random post3 ",
    description: "The love of God supersedes the love of man. God loves unconditionally. However, with man, there is a fee attached!Graciasruing to Nigeria from the Crude oil value chain have been suboptimal despite being the largesa piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions",
    author: "david",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "A random on business4",
    description: 'Lorem Ipsum has been the industke a type specimen bing, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "david",
    community_name: "Business",
    post_id: uuidv4(),
},
    {title: "Why inflation in Nigeria resists the law of gravity5",
    description: 'Loalso the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "david",
    community_name: "Business",
    post_id: uuidv4(),
},
    {title: 'Exclusive: "How to travel to Canada by Okada6',
    description: 'o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "david",
    community_name: "Business",
    post_id: uuidv4(),
},
    {title: "A random on business7",
    description: 'Lorem Ipstting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to impleme strict compliance.',
    author: "david",
    community_name: "Business",
    post_id: uuidv4(),
},
    {title: "This is a random post on nature8",
    description: 'Nigeria printing an leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Seconitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "david",
    community_name: "Entertainment",
    post_id: uuidv4(),
},
    {title: "The wedding party9",
    description: 'The storyline of the wedding party is indeed adustryt empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "david",
    community_name: "Entertainment",
    post_id: uuidv4(),
},
    {title: "The classic story of two animals and other adventures10.",
    description: 'Classical stories of two animals and othe when an unknown p specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporationelopment and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "messi",
    community_name: "Entertainment",
    post_id: uuidv4(),
},
    {title: "You must stand with the youths: Atiku to Jagaban11",
    description: 'Gains accruing to Nigerhe tributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "mane",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "I will make 1 naira equal to 1 dollar. Baba to Nigrians12",
    description: 'Gains accruing to Nigerhe pe , remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addition, capital flight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). DMB) to implement its provisions and ensure strict compliance.',
    author: "mane",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "Your interests will be my priority: Atiku to Nigerian Youths13",
    description: 'The presidentng.he printing  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingslent Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "mane",
    community_name: "Politics",
    post_id: uuidv4(),
},
    {title: "How NFT is changing the world14",
    description: 'The secret behind NFTs Nigerhe printirvices around the Oil andight, dependence on foreign expertise, lack of technology and skills transfer, and agitations for indigenous inclusiveness informed the call for local content.The Olusegun Obasanjo Administration pioneered the local content policy (Jude & Ernest, 2014). The Nigerian National Petroleum Corporation (NNPC) set over a score of Domiciliation guidelines for the Nigerian Content Division (NCD) with a projected 45 percent and 70 percent attainment of local content by 2006 and 2010 respectively (Jude & Ernest, 2014). However, failure to attain these goals birthed the Nigerian Oil and Gas Industry Content Development Act (NOGICDA) 2010 also known as the Nigerian Content Act. Section 103 of the Act empowers the Nigerian Content Development and Monitoring Board (NCDMB) to implement its provisions and ensure strict compliance.',
    author: "mane",
    community_name: "Business",
    post_id: uuidv4(),
},

]

async function postsCreation(){
    try{
        await db.connect();
        posts.forEach( async (post) =>{
            const { title, description, author, community_name, post_id } = post;
            await db.query("INSERT INTO posts (title, description, author, community_name, post_id) VALUES($1, $2, $3, $4, $5 );", [title, description, author, community_name, post_id ])
            console.log("posts Insertions were successful!")
       })
    }catch(error){
        console.log(error.message)
    }

}


postsCreation();
