import { useRouter, useSearchParams } from 'next/navigation';

const useURLParams = () => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const setUrlParams = (queryName: string, queryValue: string) => {

        const url = new URL(window.location.href);

        let queryVal = queryValue;

        let params = new URLSearchParams(url.search);

        if (params.has(queryName)) {
        
            params.set(queryName, queryVal);
        } else {
            params.append(queryName, queryVal);
        }

        const newPath = `${url.pathname}?${params.toString()}`;

        router.replace(newPath);
    
    };

    const setMultipleUrlParams = (queryParams: { [key: string]: string }) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        for (const [key, value] of Object.entries(queryParams)) {
            if (params.has(key)) {
                params.set(key, value);
            } else {
                params.append(key, value);
            }
        }

        const newPath = `${url.pathname}?${params.toString()}`;

        router.replace(newPath);
    };

    const getUrlParamsValue = ( paramName: string) => {

        const value = searchParams.get(paramName) || '';

        return value;
    };

    const getAllUrlParams = (): { key: string, value: string }[] => {

        const searchParams = new URLSearchParams(window.location.search);

        const params = [];

        for(const [key, value] of searchParams){

            params.push({key, value})
        }

        return params;
    };


    return {
        setUrlParams,
        setMultipleUrlParams,
        getUrlParamsValue,
        getAllUrlParams,
    }
};

export default useURLParams;