import { EditorContext } from 'contexts/EditorContext';
import Cookie from "js-cookie";
import { useCallback, useContext } from 'react';
import {useToast} from "../components/ui/use-toast"

const usePublishChanges = () => {

  const token = Cookie.get('token');
  const { content } = useContext(EditorContext);
  const { toast } = useToast()
  // Memoize the publishChanges function using useCallback
  const publishChanges = useCallback(async () => {

    if (!token || content.path === '/'){
      return null;
    } 
    try {
    
    const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' };
      let res = await fetch('http://localhost:4000/save-file', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ content: content.content, filepath: content.path })
      });
      let jsonRes = await res.json();
      toast({
        description: jsonRes.message,
        variant: "success",
    });
    } catch (error) {
      toast({
        description: 'An error occurred while publishing changes',
        variant: "success",
    })
    }
  }, [token, content]); // Memoized with dependencies on token and content
  return { publishChanges }; // Return both message and publishChanges function
};

export default usePublishChanges;
