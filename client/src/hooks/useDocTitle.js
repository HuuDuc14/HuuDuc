import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - HuuDuc`;
        } else {
            document.title = 'HuuDuc | The Perfect Audio Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
