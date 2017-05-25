import { call, put, take } from 'redux-saga/effects';
import { getImages } from './photoApi'

export function* loadImages() {
    try {

        const images = yield call(getImages);
        yield put({ type: 'FETCHED_IMAGES', payload: images });
        yield put({ type: 'SELECT_IMAGE', payload: +(images.data.length - 1) })
    } catch (error) {
        //yield put({ type: 'LOAD_IMAGES_FAILURE', error })
    }
}

export function* watchPhoto() {
    while (true) {
        yield take('LOAD_IMAGES');
        yield call(loadImages);
    }
}