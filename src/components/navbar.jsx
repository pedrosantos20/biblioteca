import Link from "next/link";


export default function Navbar (){
    return(
    <div className='navbar'>
        <ul>
            <li>
                <Link href="/"><h1>Home</h1></Link>
            </li>
            <li>
                <Link href="/cadastro"><h1>Cadastro</h1></Link> 
            </li>
        </ul>
    </div>
  );

}
