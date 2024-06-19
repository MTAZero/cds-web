import React, {useEffect, useImperativeHandle, useRef, useState} from "react";
import {Modal, Space, Row, Col} from "antd";
import "./ModalCustom.scss";
import {useAppDispatch} from "hooks";
import {setIsOpenModalRedux} from "../../redux/global/global.slice";
const ModalCustom = React.forwardRef((props: any, ref) => {
  const {onCloseModal, onOpenModal} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => ({
    openModal: () => {
      openModal();
    },
    closeModal: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(setIsOpenModalRedux(isModalOpen));
    if (isModalOpen && onOpenModal) {
      onOpenModal();
    }
    if (!isModalOpen && onCloseModal) {
      onCloseModal();
    }
  }, [isModalOpen]);
  return (
    <div className="modal">
      <Modal
        wrapClassName="modal-custom"
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={"80%"}
        {...props}
      >
        {React.cloneElement(props.children, {
          closeModal: closeModal,
        })}
      </Modal>
    </div>
  );
});

export {ModalCustom};
