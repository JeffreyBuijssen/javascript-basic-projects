import { getElement } from './utils.js';


const sidebar = getElement('.sidebar-overlay');

const showSidebar = () => {
    sidebar.classList.add('show');
};

const hideSidebar = () => {
    if (sidebar.classList.contains('show'))
        sidebar.classList.remove('show');
};

export const toggleSidebar = () => {
    getElement('.sidebar-overlay').classList.add('show');
}

getElement('.toggle-nav').addEventListener('click', showSidebar);

getElement('.sidebar-close').addEventListener('click', hideSidebar);