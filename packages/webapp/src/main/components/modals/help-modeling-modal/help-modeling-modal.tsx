import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContentProps } from '../application-modal-types';

type Props = {} & ModalContentProps;

type State = {};

export class HelpModelingModal extends Component<Props, State> {
  render() {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Как пользоваться?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <th>Добавить класс</th>
                <td>
                Чтобы добавить класс, просто перетащите один из элементов с правой стороны в область редактора на панели инструментов.
                   левая сторона.
                </td>
                <td>
                  <img width="300" src="/images/help/help-create-element.png" alt="Image not found" />
                </td>
              </tr>
              <tr>
                <th>Добавить связь</th>
                <td>
                Чтобы добавить ассоциацию, выберите исходный класс одним щелчком мыши, и вы увидите четыре синих круга.
                   Это возможные точки соединения для ассоциаций. Нажмите и удерживайте один из них и перетащите его
                   к другому синему кругу, чтобы создать ассоциацию.
                </td>
                <td>
                  <img width="300" src="/images/help/help-create-relationship.jpg" alt="Image not found" />
                </td>
              </tr>
              <tr>
                <th>Изменить класс</th>
                <td>
                Чтобы отредактировать класс, дважды щелкните его, и откроется всплывающее окно, в котором вы можете редактировать его компоненты, например.
                   имя, атрибуты, методы и т. д.
                </td>
                <td>
                  <img width="300" src="/images/help/help-update-element.jpg" alt="Image not found" />
                </td>
              </tr>
              <tr>
                <th>Удалить класс</th>
                <td colSpan={2}>
                Чтобы удалить класс, выберите его одним щелчком мыши и либо нажмите <code>Delete</code> или{' '}
                  <code>Backspace</code> на клавиатуре.
                </td>
              </tr>
              <tr>
                <th>Переместить класс</th>
                <td>
                Чтобы переместить класс, выберите его одним щелчком мыши и либо используйте стрелки на клавиатуре, либо перетащите
                   Это.
                </td>
                <td>
                  <img width="300" src="/images/help/help-move-element.jpg" alt="Image not found" />
                </td>
              </tr>
              <tr>
                <th>Отменить и повторить</th>
                <td colSpan={2}>
                 <code>Ctrl+Z</code> и <code>Ctrl+Y</code> вы можете отменить и повторить ваши изменения.
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.close}>
            Закрыть
          </Button>
        </Modal.Footer>
      </>
    );
  }
}
