import axios  from 'axios';
export const upload = async (file)=>{
    try {
        const formData=new formData();
        formData.append('image',file);
        const {data}= await  axios.post("http://localhost:5000/api/upload", formData,{
            headers:{"content-type":"multipart/form-data"},
        },
    );
    return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
