import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('supabase_jwt');
    if (token) {
      router.replace('/home'); // Redirect ke /home jika sudah login
    } else {
      router.replace('/login'); // Redirect ke /login jika belum login
    }
  }, [router]);

  return null; // Tidak perlu render apa pun
};

export default Index;
