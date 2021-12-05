import axios from 'axios';
import * as https from 'https';

const rootAPI = process.env.NEXT_PUBLIC_API;
const keyAPI = process.env.NEXT_PUBLIC_KEY;
const rootStream = process.env.STREAMTAPE_PUBLIC_API;
const streamUsername = process.env.STREAMTAPE_PUBLIC_USERNAME;
const streamPassword = process.env.STREAMTAPE_PUBLIC_PASSWORD;
const streamFolderId = process.env.STREAMTAPE_MOVIE_FOLDER_ID;

interface streamMovRes {
  name: string;
  size: number;
  link: string;
  created_at: number;
  downloads: number;
  linkid: string;
  convert: string;
}

interface streamResult {
  status: number;
  msg: string;
  result: {
    folder: any[];
    files: streamMovRes[];
  };
}

export async function getMoviesUrl(idm: number) {
  const stringIdm = idm.toString();
  let url = `${rootStream}/file/listfolder?login=${streamUsername}&key=${streamPassword}&folder=${streamFolderId}`;

  console.log(url)

  const responses = await axios({
    url: url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });

  const data = responses.data as streamResult;
  const files = data.result.files;
  const filtered = files.filter((mov) => mov.name == stringIdm);
  return {
    status: filtered.length == 0 ? false : true,
    data: filtered[0],
  };
}

export async function getCategories() {
  const axiosResponse = await axios.get(
    `${rootAPI}/genre/movie/list?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getDetailMovie(idm: number) {
  const axiosResponse = await axios.get(`${rootAPI}/movie/${idm}?${keyAPI}`);
  const { data } = axiosResponse;
  return data;
}

export async function getVideoTrailer(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/videos?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getSimilarMovies(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/similar?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getCategoryMovies(idc: number, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/discover/movie?${keyAPI}&with_genres=${idc}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getTrendingMovies(param: string, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/trending/movie/${param}?${keyAPI}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getMovies(param: string, page = 1) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${param}?${keyAPI}&page=${page}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getResultMovies(query: string) {
  const axiosResponse = await axios.get(
    `${rootAPI}/search/movie?${keyAPI}&query=${query}`
  );
  const { data } = axiosResponse;
  return data;
}

export async function getCredits(idm: number) {
  const axiosResponse = await axios.get(
    `${rootAPI}/movie/${idm}/credits?${keyAPI}`
  );
  const { data } = axiosResponse;
  return data;
}
