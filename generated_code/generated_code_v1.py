import pygame
import random
import math
import logging
from typing import List, Tuple

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants
WIDTH, HEIGHT = 800, 600
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
ORANGE = (255, 165, 0)
PURPLE = (128, 0, 128)

# Initialize Pygame
try:
    pygame.init()
except Exception as e:
    logging.error(f"Failed to initialize Pygame: {e}")
    exit(1)

# Screen setup
try:
    screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)
    pygame.display.set_caption("Tower Defense")
except Exception as e:
    logging.error(f"Failed to set up Pygame screen: {e}")
    exit(1)

clock = pygame.time.Clock()

# Classes
class Tower:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self.range = 100
        self.damage = 1
        self.cooldown = 60
        self.timer = 0

    def draw(self):
        try:
            pygame.draw.circle(screen, BLUE, (self.x, self.y), 20)
            pygame.draw.circle(screen, BLACK, (self.x, self.y), self.range, 1)
        except Exception as e:
            logging.error(f"Error drawing Tower: {e}")

    def shoot(self, enemies: List['Enemy']):
        if self.timer <= 0:
            for enemy in enemies:
                try:
                    distance = math.hypot(self.x - enemy.x, self.y - enemy.y)
                    if distance < self.range:
                        enemy.health -= self.damage
                        self.timer = self.cooldown
                        bullets.append(Bullet(self.x, self.y, enemy))
                        break
                except Exception as e:
                    logging.error(f"Error shooting from Tower: {e}")
        else:
            self.timer -= 1

class Enemy:
    def __init__(self, path: List[Tuple[int, int]]):
        self.path = path
        self.index = 0
        self.x, self.y = self.path[self.index]
        self.speed = 2
        self.health = 3

    def move(self):
        if self.index < len(self.path) - 1:
            try:
                target_x, target_y = self.path[self.index + 1]
                angle = math.atan2(target_y - self.y, target_x - self.x)
                self.x += self.speed * math.cos(angle)
                self.y += self.speed * math.sin(angle)
                if math.hypot(target_x - self.x, target_y - self.y) < self.speed:
                    self.index += 1
            except Exception as e:
                logging.error(f"Error moving Enemy: {e}")

    def draw(self):
        try:
            pygame.draw.circle(screen, RED, (int(self.x), int(self.y)), 10)
        except Exception as e:
            logging.error(f"Error drawing Enemy: {e}")

    def is_dead(self):
        return self.health <= 0

class Bullet:
    def __init__(self, x: int, y: int, target: Enemy):
        self.x = x
        self.y = y
        self.target = target
        self.speed = 5
        self.color = YELLOW

    def move(self):
        try:
            angle = math.atan2(self.target.y - self.y, self.target.x - self.x)
            self.x += self.speed * math.cos(angle)
            self.y += self.speed * math.sin(angle)
        except Exception as e:
            logging.error(f"Error moving Bullet: {e}")

    def draw(self):
        try:
            pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), 5)
        except Exception as e:
            logging.error(f"Error drawing Bullet: {e}")

class Game:
    def __init__(self):
        self.path = [(100, 300), (200, 300), (300, 400), (400, 400), (500, 300), (700, 300)]
        self.towers: List[Tower] = []
        self.enemies: List[Enemy] = []
        self.bullets: List[Bullet] = []
        self.spawn_rate = 120
        self.spawn_timer = self.spawn_rate
        self.score = 0

    def spawn_enemy(self):
        try:
            self.enemies.append(Enemy(self.path))
        except Exception as e:
            logging.error(f"Error spawning Enemy: {e}")

    def draw_path(self):
        try:
            pygame.draw.lines(screen, BLACK, False, self.path, 5)
        except Exception as e:
            logging.error(f"Error drawing path: {e}")

    def update(self):
        screen.fill(WHITE)
        self.draw_path()

        # Spawn enemies
        self.spawn_timer -= 1
        if self.spawn_timer <= 0:
            self.spawn_enemy()
            self.spawn_timer = self.spawn_rate

        # Update and draw enemies
        for enemy in self.enemies[:]:
            try:
                enemy.move()
                enemy.draw()
                if enemy.is_dead():
                    self.enemies.remove(enemy)
                    self.score += 1
            except Exception as e:
                logging.error(f"Error updating Enemy: {e}")

        # Update and draw towers
        for tower in self.towers:
            try:
                tower.draw()
                tower.shoot(self.enemies)
            except Exception as e:
                logging.error(f"Error updating Tower: {e}")

        # Update and draw bullets
        for bullet in self.bullets[:]:
            try:
                bullet.move()
                bullet.draw()
                if math.hypot(bullet.x - bullet.target.x, bullet.y - bullet.target.y) < 10:
                    bullet.target.health -= 1
                    self.bullets.remove(bullet)
            except Exception as e:
                logging.error(f"Error updating Bullet: {e}")

        # Draw score
        try:
            font = pygame.font.Font(None, 36)
            score_text = font.render(f"Score: {self.score}", True, PURPLE)
            screen.blit(score_text, (10, 10))
        except Exception as e:
            logging.error(f"Error drawing score: {e}")

        pygame.display.flip()

def main():
    game = Game()
    running = True
    paused = False

    try:
        while running:
            clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                if event.type == pygame.MOUSEBUTTONDOWN:
                    try:
                        x, y = pygame.mouse.get_pos()
                        game.towers.append(Tower(x, y))
                    except Exception as e:
                        logging.error(f"Error adding Tower: {e}")
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_p:
                        paused = not paused

            if not paused:
                game.update()

    except Exception as e:
        logging.error(f"Game loop error: {e}")
    finally:
        pygame.quit()

if __name__ == "__main__":
    main()