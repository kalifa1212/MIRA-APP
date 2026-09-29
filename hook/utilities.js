import { useState,useEffect } from "react";
import axios from "axios";


const utilities = () => {

    const BearerKey="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc4Nzc0ODYyOSwiaWF0IjoxNzg3MTQzODI5fQ.-QDB8Sn0jKxY-HHkZBScyx_UHP1ccu_shbTDb34DnFI";
    const ipAdresse="localhost";

    return {BearerKey,ipAdresse};
}
export default utilities
// npx expo start --dev-client=false
