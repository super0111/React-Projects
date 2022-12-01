import React from "react";
import styles from "./Ocassion_boxes.module.scss";
export default function Ocassion_boxes(props) {
  return (
    <div sel={props.title} className={styles.Ocassion_box}>
      <h3 className={styles.Ocassion_box_head}>{props.title}</h3>
      <p className={styles.Ocassion_box_description}>{props.content}</p>
      {/* <div className={styles.Ocassion_box_btn}>
        <Link to={routeNames.projects}>
        <GradientBtn text={'See more'} />
        </Link>
      </div> */}
    </div>
  );
}
