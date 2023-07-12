import { useState, useRef, useEffect } from 'react';

interface SearchResult {
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
}

export const useSearch = (): SearchResult => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const firstTyping = useRef<boolean>(true);

  useEffect(() => {
    if (firstTyping.current) {
      firstTyping.current = result === '';
      return;
    }
    if (result.match(/^\d+$/)) {
      setError('must be a number');
      return;
    }
    if (result.length <= 3) {
      setError('Please enter more than 3 characters');
      return;
    }
    setError(null);
  }, [result]);
  return { result, setResult, error };
};
