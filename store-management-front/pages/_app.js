import { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import styles from '../styles/Main.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar';
import userService from '../services/user';
import { useRouter } from 'next/router';
import permissionPageMaps from '../constants/permission-pagemaps';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null;

    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const user = userService.userValue;
    if (!user) {
      router.push('/login');
    }

    const { pathname } = router;

    if (user && user.rights) {
      const currentRequiredRight = permissionPageMaps.find(
        ({ route }) => route === pathname,
      );
      if (currentRequiredRight) {
        const { right } = currentRequiredRight;
        if (!user.rights.map(({ name }) => name).includes(right)) {
          router.push('/401');
        }
      }
    }
  }, [userService.userValue]);

  return (
    <div>
      <Head>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: Inter;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
        <title>Store front</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <div className={router.asPath === '/login' ? 'p-4' : 'card p-4'}>
          <Component {...pageProps} currentUser={user} />
        </div>
      </main>
    </div>
  );
}

export default MyApp;
