import axios from "axios";
const Axiosinstance = axios.create({
     baseURL: 'https://gorest.co.in/public/v2/',
     headers: {
            'Authorization': `Bearer ${"e72e782c3c2431cce22a299161e21c71f8e369f79c92d4502e50bc650fc97cca"}`,
            'Content-Type': 'application/json' // Set the Content-Type header
        },
});
export default Axiosinstance;