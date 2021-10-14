import Head from 'next/head';
import menus from '../constants/menu';

export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized!</h1>
      <h3>Sorry, you do not have permissions to access this resouce!</h3>
    </div>
  );
}
