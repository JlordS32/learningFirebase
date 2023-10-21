export const createLocalData = (key: string, value: Array<Object>): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const fetchData = (key: string): Array<Object> | null => {
   const dataString = localStorage.getItem(key);
   const data = dataString ? JSON.parse(dataString) : null;
 
   return data;
 };
