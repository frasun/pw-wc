import {knowledgeItemList} from '../components/knowledge-item-list/knowledge-item-list.js';
import {knowledgeItem} from '../components/knowledge-item-list/knowledge-item.js';
import {userList} from '../components/users/user-list.js';
import {courseList} from '../components/courses/course-list.js';

import SOURCES from '../components/knowledge-item-list/constants.js'

export const ACTIONS = ['create-item', 'submit-item']

export const ROUTES = [
  {
    path: 'dev',
    title: 'Konwledge Base',
    component: knowledgeItemList,
    action: ACTIONS[0]
  },
  {
    path: 'new-item',
    title: 'Create new item',
    component: knowledgeItem,
    theme: 'white',
    cancel: true,
    action: ACTIONS[1]
  },
  {
    path: 'items/:itemId',
    title: 'Edit item',
    component: knowledgeItem,
    cancel: true,
    setup:(component, info) => {
      component.sources = SOURCES[info.match.params.itemId].sources
      component.name = SOURCES[info.match.params.itemId].name
    }
  },
  {
    path: 'courses',
    title: 'Courses',
    component: courseList,
    theme: 'tomato',
  },
    {
    path: 'users',
    title: 'Users',
    component: userList,
    theme: 'blue',
  },
  {
    path: '**',
    redirectTo: 'dev'
  }
]