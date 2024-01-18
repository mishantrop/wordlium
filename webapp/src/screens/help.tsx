import React from 'react'

import { Modal } from '../components/modal/modal'
import { Layout } from '../layout/layout/layout'
import Header from '../layout/Header/header'
import * as styles from '../app.module.css'
import { Letter } from '../components/wordline/letter'

export const ScreenHelp = ({ onClose }: { onClose: () => void; }) => {
    return (
        <Layout
            header={(<Header/>)}
        >
            <Modal
                title="Как играть?"
                onClose={onClose}
            >
                <div className={styles.typography}>
                    <p>Задача: угадать загаданное слово с шести попыток.</p>
                    <p>После каждой попытки буквы в квадратиках и на клавиатуре подсвечиваются определённым образом, чтобы было чуть проще.
                        Например, загадано слово КЛОУН, и вы вводите слово НЮАНС:</p>
                    <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                        <Letter char="н" mode="near" />
                        <Letter char="ю" />
                        <Letter char="а" />
                        <Letter char="н" mode="near" />
                        <Letter char="с" />
                    </div>
                    <p>Буква Н есть в загаданном слове, но стоит в другом месте.</p>
                    <p>Затем ввели слово БЛОХА. Буквы Л и О есть в загаданном слове и стоят на правильных местах.</p>
                    <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                        <Letter char="б" />
                        <Letter char="л" mode="ok" />
                        <Letter char="о" mode="ok" />
                        <Letter char="х" />
                        <Letter char="а" />
                    </div>
                    <p>Если слово угадано правильно, то все буквы будут выделены.</p>
                    <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                        <Letter char="к" mode="ok" />
                        <Letter char="л" mode="ok" />
                        <Letter char="о" mode="ok" />
                        <Letter char="у" mode="ok" />
                        <Letter char="н" mode="ok" />
                    </div>

                    <p><b>Какие слова загаданы?</b></p>
                    <p>Загаданы существительные в единственном числе</p>

                    <p><b>Могут ли в загаданном слове быть одинаковые буквы, например, ВАННА?</b></p>
                    <p>Да, в загаданном слове могут быть одинаковые буквы</p>

                    <p><b>Считаются ли Е и Ё одной буквой?</b></p>
                    <p>Нет, Е и Ё &mdash; это разные буквы</p>
                </div>
            </Modal>
        </Layout>
    )
}
