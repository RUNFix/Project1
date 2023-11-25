import { Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

const PATH_ROUTER = __dirname;
const router = Router();

const cleanFileName = (fileName: string) => path.parse(fileName).name;

const loadRoutes = async () => {
  const files = readdirSync(PATH_ROUTER).filter(
    (fileName) => cleanFileName(fileName) !== 'index',
  );

  for (const fileName of files) {
    try {
      const cleanName = cleanFileName(fileName);
      const moduleRouter = await import(path.join(PATH_ROUTER, fileName));
      if (moduleRouter.router) {
        console.log(`Cargando la ruta: ${cleanName}`);
        router.use(`/${cleanName}`, moduleRouter.router);
      } else {
        console.error(
          `The module ${cleanName} does not export a router. Found:`,
          moduleRouter,
        );
      }
    } catch (error) {
      console.error(`Error loading the route ${fileName}:`, error);
    }
  }
};

loadRoutes();

export { router };
