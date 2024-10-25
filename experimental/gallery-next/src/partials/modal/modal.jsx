import classNames from "classnames";
import ImageContainer from "@/components/image-container/image-container";
import { useSize } from "@/hooks/use-size/use-size";
import styles from "./modal.module.css";

export default function Modal({ onClose, data }) {
    const { aspectRatio } = useSize({ width: data.image.width, height: data.image.height });

    return (
        <div id="preview" className={classNames(styles.modal, styles.open)}>
            <div className={styles["modal-content"]}>
                <button id="close-modal-link" className={styles["modal-close-button"]} onClick={onClose} title="Close Button">
                    <div className={classNames(styles["modal-close-button-icon"], "animated-icon", "close-icon", "hover")} title="Close Icon">
                        <span className="animated-icon-inner">
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                </button>
                <header className={styles["modal-header"]}>{ data.image.alt }</header>
                <section className={styles["modal-body"]}>
                    <div style={{ aspectRatio, width: "100%" }} >
                        <ImageContainer {...data.image} />
                    </div>
                </section>
            </div>
        </div>
    );
}
