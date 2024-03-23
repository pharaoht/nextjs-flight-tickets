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

    const getUrlParamsValue = ( paramName: string) => {

        const value = searchParams.get(paramName) || '';

        return value;
    };


    return {
        setUrlParams,
        getUrlParamsValue,

    }
};

export default useURLParams;