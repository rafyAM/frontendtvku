import React from "react";
import Image from "next/image";
import Link from "next/link";

const PopupIklan = ({ onClose }: { onClose: () => void }) => {
  return (
    <div id="mymodal" className="modal" style={{ zIndex: 9999 }}>
      <div
        className="  bs-example-modal-lg"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <Link
              href="https://tvku.tv/advertisement/uploads/Iklan_25-03-05-11-01-35.jpeg"
              target="_blank"
              className="bunga-center"
            >
              <Image
                src="https://tvku.tv/advertisement/uploads/Iklan_25-03-05-11-01-35.jpeg"
                alt="Iklan"
                width={800}
                height={400}
                style={{ width: "100%", height: "auto" }}
                className="bunga-center"
              ></Image>
            </Link>
            <br />
            <button
              onClick={onClose}
              id="buttonclosemodal"
              type="button"
              className="btn bunga-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupIklan;
