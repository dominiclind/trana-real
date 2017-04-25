import Reactotron from 'reactotron-react-native'

export const log = (string) => {
	Reactotron.log(string);
};

export const warn = (string) => {
	Reactotron.warn(string)
}