import UserService from '@/service/UserService';

type Instance = UserService;

const Container = new Map<string, Instance>();

export default Container;
