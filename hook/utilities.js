import { useState,useEffect } from "react";
import axios from "axios";


const utilities = () => {

    const BearerKey="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1NDM4Mzg4MiwiaWF0IjoxNzUzNzc5MDgyfQ.4Ey5EsNGsB4JBKidEP27UMps7gMiMBT0sWHqZFV6RiY";
    const ipAdresse="https://miraapi.onrender.com";

    return {BearerKey,ipAdresse};
}
export default utilities
// npx expo start --dev-client=false
