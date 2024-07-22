const axios=require("axios")

const fetchApiHandler=async (req,res)=>{
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const category=req.params.category
    const apiKey=process.env.NEWS_API_KEY

    const url = category=="headlines"?`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`:`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        res.send(response.data);
      } catch (error) {
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
    }

}

module.exports=fetchApiHandler