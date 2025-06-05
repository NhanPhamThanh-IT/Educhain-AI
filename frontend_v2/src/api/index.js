import axiosInstance from './axios';

const appendToFormData = (formData, prefix, value) => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.keys(item).forEach((itemKey) => {
            appendToFormData(formData, `${prefix}[${index}][${itemKey}]`, item[itemKey]);
          });
        });
      } else if (value instanceof Date) {
        const formattedValue = value.toISOString();
        formData.append(prefix, formattedValue);
      } else if (value instanceof File) {
        formData.append(prefix, value);
      } else if (value !== undefined && value !== null) {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty('value')) {
          formData.append(prefix, value.value);
        } else {
          const isAddressProperty = prefix.toLowerCase().includes('address');
          // Convert object to JSON string if it's an address property
          if (isAddressProperty) {
            const jsonValue = JSON.stringify(value);
            formData.append(prefix, jsonValue);
          } else {
            Object.keys(value).forEach((key) => {
              appendToFormData(formData, `${prefix}[${key}]`, value[key]);
            });
          }
        }
      }
    } else {
      formData.append(prefix, value);
    }
  };
const convertObjectToFormData = (obj) => {
    const formData = new FormData();
  
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== undefined && value !== null) {
        appendToFormData(formData, key, value);
      }
    });
  
    return formData;
  };

// authentication
export const loginApi = (data) => axiosInstance.post('http://localhost:8000/api/auth/login', data);
export const registerApi = (data) => axiosInstance.post('http://localhost:8000/api/auth/register', data);

// user
export const getUserProfileApi = () => axiosInstance.get('http://localhost:8000/api/user/profile');
export const updateUserProfileApi = (data) => axiosInstance.put('http://localhost:8000/api/user/update_user', data);

//course 
export const createCourse = (data) => axiosInstance.post(`http://localhost:8000/api/api/${data.user_id}/create_course`, data);

export const uploadFile = (data) => {
    const formData = convertObjectToFormData(data);
    return axiosInstance.put(`http://localhost:8000/api/storage/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };