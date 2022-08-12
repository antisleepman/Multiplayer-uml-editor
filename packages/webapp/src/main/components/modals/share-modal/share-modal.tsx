import React, { Component } from 'react';
import { Button, FormControl, InputGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Diagram } from '../../../services/diagram/diagram-types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/application-state';
import { DiagramRepository } from '../../../services/diagram/diagram-repository';
import { DEPLOYMENT_URL } from '../../../constant';
import { DiagramView } from 'shared/src/main/diagram-view';
import { ErrorRepository } from '../../../services/error-management/error-repository';
import { ErrorActionType } from '../../../services/error-management/error-types';
import { ModalContentProps } from '../application-modal-types';
import { LocalStorageRepository } from '../../../services/local-storage/local-storage-repository';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TooltipIcon from 'webapp/assets/tooltip.svg';

type OwnProps = {} & ModalContentProps;

type StateProps = {
  diagram: Diagram | null;
};

type DispatchProps = {
  createError: typeof ErrorRepository.createError;
};

type Props = OwnProps & StateProps & DispatchProps;

const enhance = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  (state) => {
    return {
      diagram: state.diagram,
    };
  },
  { createError: ErrorRepository.createError },
);

const getInitialState = () => {
  return {
    view: DiagramView.EDIT,
    token: '',
  };
};

type State = typeof getInitialState;

class ShareModalComponent extends Component<Props, State> {
  state = getInitialState();

  getLinkForView = () => {
    return `${DEPLOYMENT_URL}/${LocalStorageRepository.getLastPublishedToken()}?view=${LocalStorageRepository.getLastPublishedType()}`;
  };

  getMessageForView = () => {
    let innerMessage = 'редактирование';
    switch (this.state.view) {
      case DiagramView.GIVE_FEEDBACK:
        innerMessage = 'дать отзыв';
        break;
      case DiagramView.SEE_FEEDBACK:
        innerMessage = 'смотреть отзыв';
        break;
      case DiagramView.COLLABORATE:
        innerMessage = 'Группа';
        break;
    }
    return `${innerMessage}`;
  };

  shareDiagram = (view: DiagramView) => {
    this.setState({ view }, () => {
      this.publishDiagram();
    });
  };

  copyLink = (displayToast = false) => {
    const link = this.getLinkForView();
    navigator.clipboard.writeText(link);
    if (displayToast) this.displayToast();
  };

  handleClose = () => {
    this.props.close();
  };

  publishDiagram = () => {
    if (this.props.diagram) {
      DiagramRepository.publishDiagramOnServer(this.props.diagram)
        .then((token: string) => {
          this.setState({ token }, () => {
            LocalStorageRepository.setLastPublishedToken(token);
            LocalStorageRepository.setLastPublishedType(this.state.view);
            if (this.state.view === 'COLLABORATE') {
              window.location.href = this.getLinkForView() + '&notifyUser=true';
            }
            this.copyLink(true);
            this.handleClose();
          });
        })
        .catch((error) => {
          this.props.createError(
            ErrorActionType.DISPLAY_ERROR,
            'Ошибка подключения',
            'Не удалось подключиться к серверу. Повторите попытку или сообщите о проблеме.',
          );
          this.handleClose();
          // tslint:disable-next-line:no-console
          console.error(error);
        });
    }
  };

  hasRecentlyPublished = () => {
    const lastPublishedToken = LocalStorageRepository.getLastPublishedToken();
    return !!lastPublishedToken;
  };

  displayToast = () => {
    toast.success(
      'Ссылка скопирована в буфер обмена и может быть отправлена ' +
        this.getMessageForView() +
        ', просто вставив ссылку. Вы можете повторно получить доступ к ссылке, перейдя в меню «Поделиться».',
      {
        autoClose: 10000,
      },
    );
  };

  render() {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Поделиться
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <p>
            После публикации эта диаграмма будет доступна всем, у кого есть доступ к ссылке, в течение не менее 12 дней.
               недели.&nbsp;
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="share-tooltip">Изменение диаграммы продлит период времени.</Tooltip>}
              >
                <TooltipIcon />
              </OverlayTrigger>
            </p>

            <div className="container mb-3">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      this.shareDiagram(DiagramView.EDIT);
                    }}
                    className="btn btn-outline-secondary w-100"
                  >
                    Изменить
                  </button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      this.shareDiagram(DiagramView.GIVE_FEEDBACK);
                    }}
                    className="btn btn-outline-secondary  w-100"
                  >
                    Дать отзыв
                  </button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      this.shareDiagram(DiagramView.SEE_FEEDBACK);
                    }}
                    className="btn btn-outline-secondary  w-100"
                  >
                    смотреть отзыв
                  </button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      this.shareDiagram(DiagramView.COLLABORATE);
                    }}
                    className="btn btn-outline-secondary w-100"
                  >
                    Группа
                  </button>
                </div>
              </div>
            </div>

            {this.hasRecentlyPublished() && (
              <fieldset className="scheduler-border">
                <legend className="scheduler-border">Недавно опубликованная диаграмма:</legend>
                <InputGroup>
                  {!this.state.token ? (
                    <FormControl readOnly value={this.getLinkForView()} />
                  ) : (
                    <a className="w-75" target="blank" href={this.getLinkForView()}>
                      <FormControl
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        readOnly
                        value={this.getLinkForView()}
                      />
                    </a>
                  )}
                  <InputGroup.Append>
                    <Button variant="outline-secondary" className="w-100" onClick={() => this.copyLink(true)}>
                      Копировать
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </fieldset>
            )}
          </>
        </Modal.Body>
      </>
    );
  }
}

export const ShareModal = enhance(ShareModalComponent);
