import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { uploadDocByServiceAction } from '../../../store/action/ServiceEngAction';
import { Toaster, toast } from 'react-hot-toast';
function UpdoladServiceEngFile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceID = urlParams.get('deviceId');
    console.log('deviceID', deviceID)
    const dispatch = useDispatch()
    const generatePdfAndUploadToS3 = async () => {
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await axios.post(`http://172.23.100.126:8000/api/s3/upload-single/${deviceID}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded successful')
            setTimeout(() => {
                window.location.reload()
            }, 500);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    return (
        <div>
            <Toaster />
            <div class="p-3">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload multiple (JPG,PDF) files</label>
                <input onChange={handleImageSelect} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />
            </div>
            <div class="p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={generatePdfAndUploadToS3} style={{backgroundColor:'#cb297b'}} class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Upload Installation Report</button>
            </div>
        </div>
    )
}

export default UpdoladServiceEngFile