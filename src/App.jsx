import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data); //Массив шагов из data.json
	const [activeIndex, setActiveIndex] = useState(0); //Индекс текущего шага

	//Флаги дляпроверки первого и последнего шагов
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	// Обработчики
	const handlePrev = () => {
		if (!isFirstStep) setActiveIndex(activeIndex - 1);
	};

	const handleNext = () => {
		if (!isLastStep) {
			setActiveIndex(activeIndex + 1);
		} else {
			setActiveIndex(0); //Начатьсначала
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					{/* текущий  шаг */}
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>

					{/* Список шагов */}
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={`${styles['steps-item']} ${
									index < activeIndex ? styles.done : ''
								} ${index === activeIndex ? styles.active : ''}`}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>

					{/* Кнопки управления */}
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handlePrev}
							disabled={isFirstStep} //Отключаем кнопку,если первый шаг
						>
							Назад
						</button>
						<button className={styles.button} onClick={handleNext}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
