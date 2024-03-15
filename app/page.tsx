import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import FlightForm from "@/components/FlightForm";

const Home = () => {

  return (
    <div className={styles.banner}>
        <div className={styles.bg}>
            <Image src='/bg.jpg' alt='cover' className={styles.cover} fill/>
            <div className={styles.content}>
                <h2 className={styles.header}>Explore the World</h2>
                <button className={styles.btn} id='book-btn'>
                  <Link className={styles.linkBtn} href='/tickets'>Explore Destinations</Link>
                </button>
            </div>

            <FlightForm/>

        </div>
    </div>
  )
}

export default Home