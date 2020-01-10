import React, {
  useState, 
  useMemo, 
  useCallback, 
  useRef,
} from 'react';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  //define o tipo do user, pegando as infos da interface
  const [users, setUsers] = useState<[User]>();

  const names = useMemo(() => users?.map(user => user.name).join(', ') || '', [users]);

  //usar sempre tipagem nos parametros do useCallback
  const greeting = useCallback(
    (user: User) => alert(`Hello ${user.name}`),
    []
  )

  inputRef.current?.focus();

  return (
    <form action="">
      <input type="text" ref={inputRef}/>
    </form>
  );
}

export default App;
