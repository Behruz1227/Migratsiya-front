import React from "react";
import Modal from "../modal/modal";

const UpdateProfileModal: React.FC = () => {
  return (
    <div>
      <Modal isOpen={false} onClose={() => {}}>
        <>
          <h2>Update Profile</h2>
          {/* form for updating profile */}
          <button onClick={() => alert("Profile updated!")}>Update</button>
          <button onClick={() => alert("Profile closed!")}>Close</button>

          {/* close button */}
          {/* <button onClick={() => setModalOpen(false)}>Close</button> */}
        </>
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
