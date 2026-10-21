import {
  NoteIcon,
  ArchiveIcon,
  FavoriteIcon,
  TrashIcon,
  LockIcon,
} from "../Icons";

export const opcionesFolder = [
  {
    key: "notas",
    label: "Notas",
    titulo: "NOTAS",
    descripcion: "Notas activas y favoritas",
    Icono: NoteIcon,
  },
  {
    key: "favoritos",
    label: "Favoritos",
    titulo: "FAVORITOS",
    descripcion: "Notas favoritas",
    Icono: FavoriteIcon,
  },
  {
    key: "bloqueados",
    label: "Bloqueados",
    titulo: "BLOQUEADOS",
    descripcion: "Notas bloqueadas",
    Icono: LockIcon,
  },
  {
    key: "archivados",
    label: "Archivados",
    titulo: "ARCHIVADOS",
    descripcion: "Notas archivadas",
    Icono: ArchiveIcon,
  },
  {
    key: "eliminados",
    label: "Papelera",
    titulo: "PAPELERA",
    descripcion: "Notas eliminadas",
    Icono: TrashIcon,
  },
];

export const opcionesTab = [
  {
    key: "about",
    titulo: "Información",
  },
];
