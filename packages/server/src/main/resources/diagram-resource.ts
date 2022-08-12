import { Request, Response } from 'express';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake.min';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DiagramDTO } from '../../../../shared/src/main/diagram-dto';
import { DiagramService } from '../services/diagram-service/diagram-service';
import { DiagramFileStorageService } from '../services/diagram-storage/diagram-file-storage-service';

export class DiagramResource {
  diagramService: DiagramService = new DiagramService(new DiagramFileStorageService());

  getDiagram = (req: Request, res: Response) => {
    const tokenValue: string = req.params.token;
    if (/^[a-zA-Z0-9]+$/.test(tokenValue)) {
      this.diagramService
        .getDiagramByLink(tokenValue)
        .then((diagram: DiagramDTO | undefined) => {
          if (diagram) {
            res.json(diagram);
          } else {
            res.status(404).send('Диаграмма не найдена');
          }
        })
        .catch(() => res.status(503).send('Возникла ошибка'));
    } else {
      res.status(503).send('Возникла ошибка');
    }
  };

  publishDiagram = (req: Request, res: Response) => {
    const diagram: DiagramDTO = req.body;
    this.diagramService.saveDiagramAndGenerateTokens(diagram).then((token: string) => {
      res.status(200).send(token);
    });
  };

  convertSvgToPdf = (req: Request, res: Response) => {
    const width: number = req.body.width;
    const height: number = req.body.height;
    if (width === undefined || height === undefined) {
      res.status(400).send('Ширина и высота должны быть определены');
    } else {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const svg = req.body.svg;
      var doc = pdfMake.createPdf({
        content: [
          {
            svg,
          },
        ],
        pageSize: { width, height },
        pageMargins: 0,
      });
      const document = doc.getStream();

      document.pipe(res);
      document.end();
    }
  };
}
